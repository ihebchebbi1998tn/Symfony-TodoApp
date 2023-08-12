<?php

namespace App\Form;

use App\Entity\Todo;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\TextType; // Import the TextType class
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Validator\Constraints\NotBlank; // Import the NotBlank constraint

class TodoType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('name', TextType::class, [
                'constraints' => [
                    new NotBlank(['message' => 'Task name cannot be blank!']),
                ],
            ])
            ->add('description', TextType::class, [
                'constraints' => [
                    new NotBlank(['message' => 'Description cannot be blank!']),
                ],
            ])
            ->add('user', TextType::class, [
                'constraints' => [
                    new NotBlank(['message' => 'User cannot be blank!']),
                ],
            ])
            ->add('role', TextType::class, [
                'constraints' => [
                    new NotBlank(['message' => 'Role cannot be blank!']),
                ],
            ])
            ->add('date', TextType::class, [
                'constraints' => [
                    new NotBlank(['message' => 'Date cannot be blank!']),
                ],
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => Todo::class,
            'csrf_protection' => false,
        ]);
    }
}
