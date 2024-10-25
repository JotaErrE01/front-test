import { RouterProvider } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { router } from "./router/router";

function App() {

  return (
    <div className="flex justify-center items-center h-[100vh] gap-8 flex-col">
      {/* {
        isLoading ? <Spinner /> :
          !data?.length ? (
            <div className="flex justify-center items-center flex-col gap-10">
              <p>No hay usuarios registrados, por favor cree uno para comenzar</p>

              <CreateUserForm />
            </div>
          ) :
            (
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
      } */}

      <RouterProvider router={router} />

      <Toaster />
    </div>
  )
}

export default App;
