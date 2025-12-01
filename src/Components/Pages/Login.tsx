import { useEffect, useState } from "react";
import {
  Paper,
  TextInput,
  PasswordInput,
  Select,
  Checkbox,
  Button,
  Title,
  Text,
  Group,
  Stack
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { Link } from "react-router-dom";

export default function Login() {
 
  const [userData, setUserData] = useState({ email: "", password: "", role:""});
  const [errorFlag, setErrorFag] = useState({ emailInvalid: false, passwordInvalid: false });
  const email_regex = new RegExp('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$');
  const password_regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$');

  const HandleSubmit = (e) => {
    e.preventDefault();
    const emailCheck = email_regex.test(userData.email);
    const passwordCheck = password_regex.test(userData.password);
    
    if (!emailCheck) setErrorFag((c) => ({ ...c, emailInvalid: true }));
    else setErrorFag((c) => ({ ...c, emailInvalid: false }));
    if (!passwordCheck) setErrorFag((c) => ({ ...c, passwordInvalid: true }));
    else setErrorFag((c) => ({ ...c, passwordInvalid: false }));
    if (userData.email.slice(userData.email.length - 10, userData.email.length) != "@gmail.com")
      setErrorFag((c) => ({ ...c, emailInvalid: true }));

    if (!errorFlag.emailInvalid && !errorFlag.passwordInvalid) console.log(userData);
    setUserData({ email: "", password: "", role: ""});
  }

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
            label="Email"
            placeholder="JohnDoe@gmail.com"
            required
            value={userData.email}
            onChange={(e) =>
              setUserData((c)=>({ ...c, email: e.target.value }))
            }
            radius="md"
            styles={{
              input: {
                backgroundColor: "rgba(15,23,42,0.9)",
                
              },
            }}
          />
          {errorFlag.emailInvalid==true&&<div className="text-xs text-red-500">
            * Invalid email
          </div>}

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
          {errorFlag.passwordInvalid && <div className="text-xs text-red-500">
            * Include atleast one character each from [a-z]& [A-Z]& [0-9]
          </div>}

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
