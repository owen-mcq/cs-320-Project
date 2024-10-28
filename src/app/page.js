import Form from "@/app/components/exerciseForm";

export default function Home() {
  return (
    <div className="min-h-screen p-4">
      <main className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Werk</h1>
        <Form />
      </main>
    </div>
  );
}
