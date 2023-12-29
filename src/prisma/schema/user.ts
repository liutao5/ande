"use server";

import prisma from "..";

export type User = {
  id: number;
  name: string;
  pass_word: string;
  create_time: Date;
};

export async function queryUser(): Promise<User[]> {
  const res = await prisma.user.findMany();
  return res;
}

export async function addUser(name: string, passWord: string) {
  const res = await prisma.user.create({
    data: {
      name: name,
      pass_word: passWord,
    },
  });
  return res;
}

export async function deleteUser(id: number) {
  const res = await prisma.user.delete({ where: { id } });
  return res;
}
