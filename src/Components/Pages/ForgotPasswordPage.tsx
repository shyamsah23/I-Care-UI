import { useState } from "react";
import {
Container,
Paper,
Title,
TextInput,
Button,
Stack,
Text,
Center,
Alert,
} from "@mantine/core";
import {
IconMail,
IconCheck,
IconAlertCircle,
} from "@tabler/icons-react";
import { forgotPassword } from "../../Services/UserService";

export default function ForgotPassword() {
const [email, setEmail] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState("");
const [success, setSuccess] = useState(false);

const handleSubmit = async (e) => {
e.preventDefault();
setError("");
setSuccess(false);

if (!email) return;

try {
  setLoading(true);

  await forgotPassword(email);

  setSuccess(true);
} catch (err) {
  setError(
    err.response?.data?.errorMessage ||
      "Failed to send reset link"
  );
} finally {
  setLoading(false);
}

};

return ( <Container size={420} my={120}> <Paper radius="md" p="xl" withBorder shadow="lg">

    <Center mb="md">
      <IconMail size={42} />
    </Center>

    <Title align="center" order={2}>
      Forgot Password
    </Title>

    <Text size="sm" c="dimmed" align="center" mb="lg">
      Enter your email to receive a reset link
    </Text>

    {error && (
      <Alert icon={<IconAlertCircle size={16} />} color="red" mb="md">
        {error}
      </Alert>
    )}

    {success && (
      <Alert icon={<IconCheck size={16} />} color="green" mb="md">
        Reset link sent successfully! Check your email.
      </Alert>
    )}

    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput
          label="Email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          required
        />

        <Button
          type="submit"
          fullWidth
          loading={loading}
          disabled={!email} // ✅ prevents empty submit
        >
          Send Reset Link
        </Button>
      </Stack>
    </form>
  </Paper>
</Container>

);
}
