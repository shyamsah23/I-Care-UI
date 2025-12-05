import { useState } from "react";
import {Paper,TextInput,PasswordInput,Select,Checkbox,Button,Title,Text,Group,Stack} from "@mantine/core";
import { Link } from "react-router-dom";
import loginUser from "../../Services/UserService";


export default function Login() {
 
  const [userData, setUserData] = useState({ username: "", password: "", role: "DOCTOR" });
  
  // const HandleUserLogin = async () => {
  //   console.log("calling login user api from backend");
  //   const data = await axios.post(
  //     "http://localhost:8081/auth/user/login",
  //     {
  //       username: userData.username,
  //       password: userData.password,
  //     },
  //     {
  //       headers: {
  //         'x-secret-key': '987654321HEAD'
  //       },
  //     }
  //   );
  //   console.log({ data });
  // };
  

  const HandleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({
        username: userData.username,
        password: userData.password,
      });

      console.log("Login success:", response);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundImage: "url('/bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
        position: "relative",
      }}
    >
      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(4px)",
        }}
      />
     
      <Paper
        component="form"
        onSubmit={HandleSubmit}
        radius="lg"
        shadow="xl"
        withBorder
        p="xl"
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 420,
          width: "100%",
          backgroundColor: "rgba(15,23,42,0.92)", // slate-900-ish
          borderColor: "rgba(16,185,129,0.6)",
          // emerald border
        }}
        className="text-emerald-100"
      >
        <Stack gap="sm" mb="md" align="center">
          <Title order={2} c="teal.2">
            I-Care Hospital
          </Title>
          <Text size="sm" c="gray.3">
            Sign in to manage hospital operations
          </Text>
        </Stack>

        <Stack gap="sm">
          <TextInput
            label="Username"
            placeholder="JohnDoe@123"
            required
            value={userData.username}
            onChange={(e) =>
              setUserData((c)=>({ ...c, username: e.target.value }))
            }
            radius="md"
            styles={{
              input: {
                backgroundColor: "rgba(15,23,42,0.9)",
                color: "white",
              },
            }}
          />

          <PasswordInput
            label="Password"
            placeholder="Your Password"
            required
            value={userData.password}
            onChange={(e) =>
              setUserData((c)=>({ ...c, password: e.target.value }))
            }
            radius="md"
            styles={{
              input: {
                backgroundColor: "rgba(15,23,42,0.9)",
                color: "white",
              },
            }}
          />

          <Select
            label="Role"
            placeholder="Select role"
            radius="md"
            data={[
              { value: "ADMIN", label: "Admin" },
              { value: "DOCTOR", label: "Doctor" },
              { value: "NURSE", label: "Nurse" },
              { value: "RECEPTIONIST", label: "Receptionist" },
              { value: "PHARMACIST", label: "Pharmacist" },
            ]}
            value={userData.role}
            onChange={(roleChosen) =>
              setUserData((c)=>({ ...c, role: roleChosen ? roleChosen : "" }))
            }
            styles={{
              input: {
                backgroundColor: "rgba(15,23,42,0.9)",
                color: "white",
              },
              dropdown: {
                backgroundColor: "rgba(15,23,42,0.9)",
                color: "#38d9a9",
              },
            }}
          />

          <Group justify="space-between" mt="xs">
            <Checkbox
              label="Remember me"
              // checked={form.remember}
              // onChange={handleChange("remember")}
              color="teal"
            />
            <Button
              variant="subtle"
              size="compact-xs"
              c="teal.3"
              px={0}
              styles={{ root: { fontWeight: 400 } }}
              type="button"
            >
              Forgot password?
            </Button>
          </Group>

          <Button
            type="submit"
            fullWidth
            mt="md"
            radius="md"
            color="teal"
            size="md"
            style={{
              fontWeight: 600,
              boxShadow: "0 10px 25px rgba(16,185,129,0.35)",
            }}
          >
            Log in
          </Button>
        </Stack>

        <Text mt="md" size="sm" ta="center" c="gray.3">
          Don&apos;t have an account?{" "}
          <Text
            component={Link}
            to="/signup"
            size="sm"
            c="teal.3"
            fw={500}
            style={{ textDecoration: "none" }}
          >
            Sign up
          </Text>
        </Text>
      </Paper>
    </div>
  );
}
