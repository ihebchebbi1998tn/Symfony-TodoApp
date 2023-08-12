<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\TodoRepository;
use App\Entity\Todo;
use DateTime;
use DateTimeZone;

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
    
        // Custom validation logic to check if all fields are not empty
        if (empty($content->name) || empty($content->description) || empty($content->user) || empty($content->role) || empty($content->date)) {
            return $this->json([
                'message' => ['text' => 'All fields must be filled!', 'level' => 'error'],
            ]);
        }
    
        // Check if the provided date is before today's date in the Africa/Tunis timezone
        $timezone = new DateTimeZone('Africa/Tunis');
        $providedDate = new DateTime($content->date, $timezone);
        $currentDate = new DateTime('now', $timezone);
        
        if ($providedDate < $currentDate) {
            return $this->json([
                'message' => ['text' => 'Date cannot be before today!', 'level' => 'error'],
            ]);
        }
    
        $todo = new Todo();
        $todo->setName($content->name);
        $todo->setDescription($content->description);
        $todo->setUser($content->user);
        $todo->setRole($content->role);
        $todo->setDate($content->date);
    
        try {
            $this->entityManager->persist($todo);
            $this->entityManager->flush();
    
            return $this->json([
                'todo' => $todo->toArray(),
                'message' => ['text' => ['Todo has been created!', 'Task:' . $content->name], 'level' => 'success'],
            ]);
        } catch (\Exception $exception) {
            return $this->json([
                'message' => ['text' => ['Could not submit todo to the database.'], 'level' => 'error'],
            ]);
        }
    }

    #[Route('/update/{id}', name: 'api_todo_update', methods: ['PUT'])]
public function update(Request $request, Todo $todo): Response
{
    $content = json_decode($request->getContent());
    $todo->setName($content->name);
    $todo->setDescription($content->description); // Add this line to update description as well
    $todo->setUser($content->user);
    $todo->setRole($content->role);
    $todo->setDate($content->date);


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
