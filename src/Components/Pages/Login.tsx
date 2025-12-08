import { useState } from "react";
import {Paper,TextInput,PasswordInput,Select,Checkbox,Button,Title,Text,Group,Stack} from "@mantine/core";
import { data, Link, useNavigate } from "react-router-dom";
import loginUser from "../../Services/UserService";
import { errorNotification, successNotification } from "../../Utility/NotificationUtility";
import { useDispatch, useSelector } from "react-redux";
import { addJWTToken, deleteJWTToken } from "../../Slices/JWTSlice";
import { jwtDecode } from 'jwt-decode';
import { addUserDetails } from "../../Slices/UserSlice";

export default function Login() {
 
  const [userData, setUserData] = useState({ username: "", password: ""});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const HandleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser({
        username: userData.username,
        password: userData.password,
      });
      const user = jwtDecode(response.jwtToken);
      successNotification("Logged in Successfully");
      dispatch(addJWTToken(response.jwtToken));
      dispatch(addUserDetails(jwtDecode(response?.jwtToken)));
      // navigate(`/${(user?.role).toLowerCase()}/dashboard`);
      console.log(jwtDecode(response.jwtToken));
      console.log("Login success:", response);
    } catch (error) {
      errorNotification(error?.response?.data?.errorMessage);
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
        position: "fixed",
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
