import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useFetch } from "@/hooks/useFetch"
import { IUsersResponse } from "@/interface/IUsersResponse"
import { useToast } from "@/hooks/use-toast"
import { ReloadIcon } from "@radix-ui/react-icons"
import { useNavigate } from "react-router"

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "El Nombre debe tener al menos 2 caracteres.",
  }),
  email: z.string().email({ message: "El Email debe ser válido.", }),
})

export function CreateUserForm() {
  const { mutate } = useFetch<IUsersResponse>('/users');
  const { toast } = useToast();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { isError } = await mutate(data);
    if(isError) return toast({ title: "Error al enviar", description: "Revisa los campos que faltan o los que tienen errores." });
    toast({
      title: "Usuario creado",
      description: "El usuario ha sido creado con éxito ✅.",
    });
    navigate('/');
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 border-[1px] border-slate-300 rounded-md p-8 w-96" autoComplete="off">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {
            form.formState.isSubmitting ? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ): (
              "Enviar"
            )
          }
        </Button>
      </form>
    </Form>
  )
}
