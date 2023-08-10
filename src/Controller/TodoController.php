<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\TodoRepository;
use App\Entity\Todo;

#[Route('/api/todo', name: 'api_todo')]
class TodoController extends AbstractController
{
    private $entityManager;
    private $todoRepository;

    public function __construct(EntityManagerInterface $entityManager, TodoRepository $todoRepository)
    {
        $this->entityManager = $entityManager;
        $this->todoRepository = $todoRepository;
    }

    #[Route('/read', name: 'api_todo_read', methods: ['GET'])]
    public function index(): Response
    {
        $todos = $this->todoRepository->findAll();
        $arrayOfTodos = [];
        foreach ($todos as $todo) {
            $arrayOfTodos[] = $todo->toArray();
        }

        return $this->json($arrayOfTodos);
    }

    #[Route('/create', name: 'api_todo_create', methods: ['POST'])]
    public function create(Request $request): Response
    {
        $content = json_decode($request->getContent());
        $todo = new Todo();
        $todo->setName($content->name);

        try {
            $this->entityManager->persist($todo);
            $this->entityManager->flush();

            return $this->json([
                'todo' => $todo->toArray(),
            ]);
        } catch (\Exception $exception) {
            return $this->json(['error' => 'An error occurred while creating the todo.']);
        }
    }

    #[Route('/update/{id}', name: 'api_todo_update', methods: ['PUT'])]
    public function update(Request $request, Todo $todo): Response
    {
        $content = json_decode($request->getContent());
        $todo->setName($content->name);

        try {
            $this->entityManager->flush();
        } catch (\Exception $exception) {
            return $this->json(['error' => 'An error occurred while updating the todo.']);
        }

        return $this->json([
            'message' => 'Todo has been updated',
        ]);
    }

    #[Route('/delete/{id}', name: 'api_todo_delete', methods: ['DELETE'])]
    public function delete(Todo $todo): Response
    {
        try {
            $this->entityManager->remove($todo);
            $this->entityManager->flush();
        } catch (\Exception $exception) {
            return $this->json(['error' => 'An error occurred while deleting the todo.']);
        }

        return $this->json([
            'message' => 'Todo has been deleted',
        ]);
    }
}
