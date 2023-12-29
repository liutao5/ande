"use client";

import { User, addUser, deleteUser, queryUser } from "@/prisma/schema/user";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Page() {
  const [userList, setUserList] = useState<User[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    query();
  }, []);

  const query = () => {
    queryUser().then((res) => {
      console.log(res);
      setUserList(res);
    });
  };

  const openDialog = () => {
    setOpen(true);
  };

  const closeDialog = () => {
    setOpen(false);
  };

  const handleAddUser = (username: string, password: string) => {
    addUser(username, password)
      .then((res) => {
        closeDialog();
        query();
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteUser = (id: number) => {
    deleteUser(id).then((res) => {
      query();
    });
  };

  return (
    <Container>
      <Button variant="contained" onClick={openDialog}>
        add user
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Password</TableCell>
            <TableCell>CreateTime</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.pass_word}</TableCell>
              <TableCell>{user.create_time.toLocaleString()}</TableCell>
              <TableCell>
                <Button onClick={() => handleDeleteUser(user.id)}>
                  delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <UserForm
        open={open}
        handleClose={closeDialog}
        handleAddUser={handleAddUser}
      />
    </Container>
  );
}

type UserFormProps = {
  handleClose: VoidFunction;
  handleAddUser: (username: string, password: string) => void;
  open: boolean;
};

const UserForm = (props: UserFormProps) => {
  const { open, handleClose, handleAddUser } = props;
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    const { username, password } = data;
    handleAddUser(username, password);
    reset();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
          <Stack spacing={2}>
            <TextField
              label="name"
              size="small"
              {...register("username", { required: true })}
            />
            <TextField
              label="password"
              size="small"
              {...register("password", { required: true })}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>close</Button>
          <Button type="submit" variant="contained">
            ok
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
