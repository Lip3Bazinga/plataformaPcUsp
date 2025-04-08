import { styles } from "@/app/styles/styles"
import { useUpdatePasswordMutation } from "@/redux/features/user/userApi"
import { FC, use, useEffect, useState } from "react"
import toast from "react-hot-toast"

type Props = {

}

const ChangePassword: FC<Props> = (props) => {

  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation()
  
  const passwordChangeHandler = async (e: any) => {
    e.preventDefault()
    if (oldPassword === "" || newPassword === "" || confirmPassword === "") toast.error("Por favor, preencha todos os campos!")
    if (oldPassword === newPassword) toast.error("Nova senha é igual à senha antiga")
    if (newPassword !== confirmPassword) {
      toast.error("As senhas não coincidem")
    } else {
      await updatePassword({ oldPassword, newPassword })
    }
  }

  useEffect(() => {
    if (isSuccess) toast.success(("Senha alterada com sucesso!"))
    if (error) {
      console.log('Entre 1')
      if ("data" in error) {
        console.log('Entre 1')
        const errorData = error as any
        toast.error(errorData.data.message)
      }
    }
  }, [isSuccess, error])

  return (
    <div className="w-full pl-7 px-2 800px:px-5 800px:pl-0">
      <h1 className="block text-[25px] 800px:text-[30px] font-Poppins text-center font-[500] text-black dark:text-[#FFF] pb-2">Alter senha</h1>
      <div className="w-full">
        <form aria-required onSubmit={passwordChangeHandler} className="flex flex-col items-center">
          <div className="w-[100%] 800px:w-[60%] mt-5">
            <label className="block pb-2 text-black dark:text-[#FFF]">Entre com a sua senha antiga</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
          <div className="w-[100%] 800px:w-[60%] mt-2">
            <label className="block pb-2 text-black dark:text-[#FFF]">Entre com a sua nova senha</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <div className="w-[100%] 800px:w-[60%] mt-2">
            <label className="block pb-2 text-black dark:text-[#FFF]">Confirme a sua nova senha</label>
            <input
              type="password"
              className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              className={`w-[95%] h-[40px] border border-purple text-center text-black dark:text-[#FFF] rounded-[3px] mt-8 cursor-pointer transition-all duration-400 ease-in-out hover:bg-purple hover:text-[#FFF]`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChangePassword