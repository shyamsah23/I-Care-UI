// src/pages/Signup.jsx
import React, { useState } from "react";
import {
  Paper,
  TextInput,
  PasswordInput,
  Select,
  Button,
  Title,
  Text,
  Group,
  Stack,
  SimpleGrid,
} from "@mantine/core";
import { Link } from "react-router-dom";

export default function Signup() {
  const [userData, setUserData] = useState({ email: "", password: "", role:"",username:"", phoneNo:"0",confirmPassword:""});
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

    if (!userData.username&&!errorFlag.emailInvalid) setUserData({ ...userData, username: userData.email.slice(0, userData.email.length - 10) });

    if (!errorFlag.emailInvalid && !errorFlag.passwordInvalid) console.log(userData);
    setUserData({ email: "", password: "", role: "", username: "",phoneNo:"",confirmPassword:"" });
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
          maxWidth: 500,
          width: "100%",
          backgroundColor: "rgba(15,23,42,0.92)",
          borderColor: "rgba(16,185,129,0.6)",
        }}
        className="text-emerald-100"
      >
        <Stack gap="xs" mb="md" align="center">
          <Title order={2} c="teal.2">
            Create I-Care Account
          </Title>
          <Text size="sm" c="gray.3">
            For doctors, nurses, pharmacists and staff
          </Text>
        </Stack>

        <Stack gap="md">
          <TextInput
            label="Full name"
            placeholder="Dr. John Doe"
            required
            value={userData.username}
            onChange={(e) => {
              setUserData((c) => ({ ...c, username: e.target.value }));
            }}
            radius="md"
            styles={{
              input: {
                backgroundColor: "rgba(15,23,42,0.9)",
                color: "white",
              },
            }}
          />

          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            <div>
              <TextInput
                label="Email"
                placeholder="you@hospital.com"
                required
                value={userData.email}
                onChange={(e) => {
                  setUserData((c) => ({ ...c, email: e.target.value }));
                }}
                radius="md"
                styles={{
                  input: {
                    backgroundColor: "rgba(15,23,42,0.9)",
                    color: "white",
                  },
                }}
              />
              {errorFlag.emailInvalid == true && (
                <div className="text-xs text-red-500 pt-1">* Invalid email</div>
              )}
            </div>

            <TextInput
              label="Phone"
              placeholder="+91 98765 43210"
              value={userData.phoneNo}
              onChange={(e) => {
                setUserData((c) => ({ ...c, username: e.target.value }));
              }}
              radius="md"
              styles={{
                input: {
                  backgroundColor: "rgba(15,23,42,0.9)",
                  color: "white",
                },
              }}
            />
          </SimpleGrid>

          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
            <Select
              label="Role"
              placeholder="Select role"
              data={[
                { value: "DOCTOR", label: "Doctor" },
                { value: "NURSE", label: "Nurse" },
                { value: "RECEPTIONIST", label: "Receptionist" },
                { value: "PHARMACIST", label: "Pharmacist" },
                { value: "ADMIN", label: "Admin" },
              ]}
              value={userData.role}
              onChange={(roleChosen) =>
                setUserData((c) => ({
                  ...c,
                  role: roleChosen ? roleChosen : "",
                }))
              }
              radius="md"
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

            <PasswordInput
              label="Password"
              placeholder="Create a strong password"
              required
              value={userData.password}
              onChange={(e) => {
                setUserData((c) => ({ ...c, password: e.target.value }));
              }}
              radius="md"
              styles={{
                input: {
                  backgroundColor: "rgba(15,23,42,0.9)",
                  color: "white",
                },
              }}
            />
          </SimpleGrid>

          <div >
          <PasswordInput
            label="Confirm password"
            placeholder="Repeat password"
            required
            value={userData.confirmPassword}
            onChange={(e) => {
              setUserData((c) => ({ ...c, confirmPassword: e.target.value }));
            }}
            radius="md"
            styles={{
              input: {
                backgroundColor: "rgba(15,23,42,0.9)",
                color: "white",
              },
            }}
          />
          {errorFlag.passwordInvalid && (
            <div className="text-xs text-red-500 pt-1">
              * Include atleast one character each from [a-z]& [A-Z]& [0-9]
            </div>
          )}
          </div>
          <Button
            type="submit"
            fullWidth
            mt="sm"
            radius="md"
            color="teal"
            size="md"
            style={{
              fontWeight: 600,
              boxShadow: "0 10px 25px rgba(16,185,129,0.35)",
            }}
          >
            Create account
          </Button>
        </Stack>

        <Text mt="md" size="sm" ta="center" c="gray.3">
          Already registered?{" "}
          <Text
            component={Link}
            to="/login"
            size="sm"
            c="teal.3"
            fw={500}
            style={{ textDecoration: "none" }}
          >
            Log in
          </Text>
        </Text>
      </Paper>
    </div>
  );
}
