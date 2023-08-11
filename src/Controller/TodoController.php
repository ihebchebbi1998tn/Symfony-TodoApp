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
        $todo->setDescription($content->description);


        try {
            $this->entityManager->persist($todo);
            $this->entityManager->flush();
        } catch (\Exception $exception) {
            return $this->json([
                'message' => ['text' => ['Could not submit to do to the database.'], 'level' => 'error'],
            ]);
        }

        return $this->json([
            'todo' => $todo->toArray(),
            'message' => ['text' => ['Todo has been created!', 'Task:' . $content->name], 'level' => 'success'],
        ]);

    }

    #[Route('/update/{id}', name: 'api_todo_update', methods: ['PUT'])]
public function update(Request $request, Todo $todo): Response
{
    $content = json_decode($request->getContent());
    $todo->setName($content->name);
    $todo->setDescription($content->description); // Add this line to update description as well

    try {
        $this->entityManager->flush();
    } catch (\Exception $exception) {
        return $this->json([
            'message' => ['text' => ['Could not modify in the database.'], 'level' => 'error'],
        ]);
    }

    return $this->json([
        'message' => ['text' => ['Todo has been updated!'], 'level' => 'success'],
    ]);
}


    #[Route('/delete/{id}', name: 'api_todo_delete', methods: ['DELETE'])]
    public function delete(Todo $todo): Response
    {
        try {
            $this->entityManager->remove($todo);
            $this->entityManager->flush();
        } catch (\Exception $exception) {
            return $this->json([
                'message' => ['text' => ['Could not delete in the database.'], 'level' => 'error'],
            ]);
        }

        return $this->json([
            'message' => ['text' => ['Todo has been deleted!'], 'level' => 'success'],        ]);
    }
}
