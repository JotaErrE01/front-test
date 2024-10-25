import { DialogToken } from "@/components/token/DialogToken";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Spinner from "@/components/ui/spinner";
import { UserSelector } from "@/components/users/UserSelector";
import { toast } from "@/hooks/use-toast";
import { useFetch } from "@/hooks/useFetch";
import { IUsersResponse } from "@/interface/IUsersResponse";
import { useState } from "react";
import { useNavigate } from "react-router";


export const HomePage = () => {
  const { data, isLoading } = useFetch<IUsersResponse[]>('/users');
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState<null | number>(null);
  const navigate = useNavigate();

  if(!data?.length && !isLoading) {
    toast({ title: "No hay usuarios registrados", description: "Por favor cree uno para comenzar" });
    navigate("/create-user");
    return <></>;
  }

  return (
    <>
      {
        isLoading ? <Spinner size="lg" /> : (
          <>
            <div className="flex justify-center gap-2 flex-col">
              <label>Usuarios</label>
              <UserSelector
                data={data?.map(user => ({ label: user.name, value: user.id.toString() })) || []}
                onChange={value => setUserId(Number(value))}
              />
            </div>

            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger disabled={!userId}>
                <Button
                  disabled={!userId}
                >Revelar TOKEN</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogToken userId={(userId as number)} />
              </DialogContent>
            </Dialog>
          </>
        )
      }

      <div className="flex gap-10">
        <Button variant='secondary' onClick={() => navigate('create-user')}>Crear nuevo usuario</Button>

        <Button variant={'secondary'} onClick={() => navigate('register')}>Ver registros</Button>
      </div>
    </>
  )
};
