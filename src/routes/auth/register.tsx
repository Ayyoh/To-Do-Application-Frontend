import RegisterForm from '@/features/-auth/-components/registerForm'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/auth/register')({
  component: RegisterPage,
})

export function RegisterPage() {
  return (
    <div className='p-3 flex flex-col gap-4'>
      <RegisterForm />
    </div>
  )
}
