<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\TodoRepository;

#[Route('/api/todo', name: 'todo')]

class TodoController extends AbstractController
{
    /** 
     * @var EntityManagerInterface
     */
    private $entityManager;

    /** 
     * @var TodoRepository
     */
    private $todoRepository;

    public function __construct(EntityManagerInterface $entityManager, TodoRepository $todoRepository) {
        $this->entityManager = $entityManager;
        $this->todoRepository = $todoRepository; // Corrected typo here
    }

    #[Route('/read', name: 'todo')]
    public function index(): Response
    {
        $todos = $this->todoRepository->findAll();
        $arrayOfTodos = [];
        foreach($todos as $todo) {
            $arrayOfTodos[] = $todo->toArray();
        }

        return $this->json($arrayOfTodos);
    }
}
