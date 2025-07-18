import StatusFilter from "./components/StatusFilter";
import TodoFooter from "./components/TodoFooter";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function Home() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center p-4">

      <div className="w-full max-w-6xl">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">To-Do Manager</h1>
          <p className="text-dark/80">Organize your day with ease</p>
        </div>
        <TodoInput />
        <StatusFilter />
        <TodoList />
       <TodoFooter/>
      </div>
    </div>
  );
}

export default Home;