import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import {
Container,
Paper,
Title,
PasswordInput,
Button,
Stack,
Text,
Center,
} from "@mantine/core";
import { IconLock, IconCheck } from "@tabler/icons-react";
import { resetPassword } from "../../Services/UserService";

export default function ResetPassword() {
const [searchParams] = useSearchParams();
const navigate = useNavigate();

const token = searchParams.get("token");

const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
e.preventDefault();

if (password !== confirmPassword) {
  alert("Passwords do not match");
  return;
}

try {
  setLoading(true);

  await resetPassword(token, password);

  alert("Password reset successful!");
  navigate("/login");
} catch (err) {
  alert("Reset failed: " + (err.response?.data?.message || err.message));
} finally {
  setLoading(false);
}


};

return ( <Container size={420} my={100}> <Paper withBorder shadow="md" p={30} radius="md"> <Center mb="md"> <IconLock size={40} /> </Center>

    <Title order={2} align="center" mb="xs">
      Reset Password
    </Title>

    <Text size="sm" color="dimmed" align="center" mb="lg">
      Enter your new password below
    </Text>

    <form onSubmit={handleSubmit}>
      <Stack>
        <PasswordInput
          label="New Password"
          placeholder="Enter new password"
          value={password}
          onChange={(e) => setPassword(e.currentTarget.value)}
          required
        />

        <PasswordInput
          label="Confirm Password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.currentTarget.value)}
          required
        />

        <Button
          fullWidth
          type="submit"
          loading={loading}
          leftSection={<IconCheck size={18} />}
        >
          Reset Password
        </Button>
      </Stack>
    </form>
  </Paper>
</Container>
);
}
