import type { Route } from "./+types/home";
import { Welcome } from "../welcome/welcome";
import { Header } from "../components/header";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router on Rails App" },
    { name: "description", content: "Welcome to React Router on Rails!" },
  ];
}

export default function Home() {
  return (
    <>
      <Header />
      <Welcome />
    </>
  );
}
