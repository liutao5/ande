import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { AppBar, Box, Button, Menu, MenuItem, Stack } from "@mui/material";

export const metadata: Metadata = {
  title: "ande",
  description: "...",
};

export default function RootLayout(props: any) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <Box height="100%">
            <AppBar
              position="fixed"
              sx={{ bgcolor: "transparent", boxShadow: 0, height: "48px" }}
            >
              <Stack direction="row" justifyContent="center" spacing={2}>
                <Button LinkComponent={Link} href="/">
                  home
                </Button>
                {/* <Button LinkComponent={Link} href="/dashboard">
                  dashboard
                </Button> */}
                <Button LinkComponent={Link} href="/database">
                  database
                </Button>
              </Stack>
            </AppBar>
            <Box sx={{ pt: "48px" }}>{props.children}</Box>
          </Box>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
