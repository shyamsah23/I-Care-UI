import { Container, Title, Text, Button, Group } from "@mantine/core";
import { IconAlertTriangle } from "@tabler/icons-react";
import { useNavigate, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();
  const error: any = useRouteError();

  const message = error?.statusText || error?.message || "Something went wrong";

  return (
    <div
      className="
        min-h-screen flex items-center justify-center
        bg-gradient-to-br from-black via-slate-900 to-emerald-900
        text-white
      "
    >
      <Container size="sm" className="text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div
            className="
              p-5 rounded-full
              bg-red-500/10 border border-red-400/30
              shadow-lg
            "
          >
            <IconAlertTriangle
              size={48}
              className="text-red-400 drop-shadow-[0_0_10px_rgba(248,113,113,0.8)]"
            />
          </div>
        </div>

        {/* Title */}
        <Title
          order={1}
          className="text-4xl font-bold text-emerald-100 tracking-wide"
        >
          Oops! Something went wrong
        </Title>

        {/* Message */}
        <Text mt="md" c="dimmed">
          {message}
        </Text>

        {/* Actions */}
        <Group mt="xl" justify="center">
          <Button
            variant="gradient"
            gradient={{ from: "teal", to: "cyan" }}
            radius="xl"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>

          <Button
            variant="outline"
            color="teal"
            radius="xl"
            onClick={() => navigate("/")}
          >
            Go Home
          </Button>
        </Group>
      </Container>
    </div>
  );
}
