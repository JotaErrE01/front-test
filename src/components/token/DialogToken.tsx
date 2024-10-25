import ClipBoard from "../ui/clipboard";
import { DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { useFetch } from "@/hooks/useFetch";
import { ITokenResponse } from "@/interface/ITokenResponse";

interface Props {
  userId: number;
}

export const DialogToken = ({ userId }: Props) => {
  const { data, isLoading } = useFetch<ITokenResponse>(`/auth/generate?userId=${userId}`);

  return (
    <div>
      <DialogHeader>
        <DialogTitle>Token de seguridad</DialogTitle>
        <DialogDescription>
          No compartas este código con nadie. Si alguien lo obtiene, podrá acceder a tu cuenta.
          <br />

          <div className={`flex justify-center ${(isLoading || !data) ? 'opacity-50' : ''}`}>
            <ClipBoard data={data?.token.toString() || ''} />
          </div>
        </DialogDescription>
      </DialogHeader>
    </div>
  )
};
