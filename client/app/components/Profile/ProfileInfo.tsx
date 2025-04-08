import Image from "next/image"
import { styles } from "../../../app/styles/styles"
import { FC, use, useEffect, useState } from "react"
import { AiOutlineCamera } from "react-icons/ai"
import avatarIcon from "../../../public/assets/avatar.png"
import { useEditProfileMutation, useUpdateAvatarMutation } from "@/redux/features/user/userApi"
import { useLoadUserQuery } from "@/redux/features/api/apiSlice"
import toast from "react-hot-toast"

type Props = {
  avatar: string | null;
  user: any;
}

const ProfileInfo: FC<Props> = ({ avatar, user }) => {

  const [name, setName] = useState(user && user.name)
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation()
  const [password, setPassword] = useState(user && user.password)
  const [age, setAge] = useState(user && user.age)
  const [telephone, setTelephone] = useState(user && user.telephone)
  const [seriesCurrentlyStudyng] = useState(user && user.seriesCurrentlyStudyng)
  const [editProfile, { isSuccess: success, error: updateError }] = useEditProfileMutation()
  const [loadUser, setLoadUser] = useState(false);
  const { } = useLoadUserQuery(undefined, { skip: true ? false : true })
  const imageHandler = async (e: any) => {
    const file = e.target.files[0];
    const fileReader = new FileReader()

    fileReader.onload = () => {
      if (fileReader.readyState === 2) {
        const avatar = fileReader.result
        updateAvatar(
          avatar,
        )
      }
    }
    fileReader.readAsDataURL(e.target.files[0])
  }

  useEffect(() => {
    if (isSuccess || success) setLoadUser(true)
    if (error || updateError) console.log("Erro ProfileInfo: ", error)
    if (isSuccess) toast.success("Perfil atualizado com sucesso!")
  }, [isSuccess, error, success, updateError])

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (name !== "") {
      await editProfile({
        name: name,
      })
    }
  }


  return (
    <>
      <div className="w-full flex justify-center">
        <div className="relative  w-[120px] h-[120px]">
          <Image
            // src={avatarIcon}
            src={user.avatar || avatar ? user.avatar.url || avatar : avatarIcon}
            alt=""
            width={120}
            height={120}
            className="w-[120px] h-[120px] cursor-pointer border-[primary] rounded-full"
          />
          <input
            type="file"
            name=""
            id="avatar"
            className="hidden"
            onChange={imageHandler}
            accept="image/png,image/jpg,image/webp"
          />
          <label htmlFor="avatar">
            <div className="w-[30px] h-[30px] bg-slate-900 rounded-full absolute bottom-2 right-2 flex items-center justify-center cursor-pointer">
              <AiOutlineCamera size={20} className="z-1" />
            </div>
          </label>
        </div>
      </div>
      <br />
      <div className="w-full pl-6 800px:pl-10">
        <form onSubmit={handleSubmit}>
          <div className="800px:w-[50%] m-auto flex flex-col gap-[25px] pb-4">
            <div className="w-[100%]">
              <label className="block">Nome Completo</label>
              <input
                type="text"
                className={`${styles.input} !w-[95%] mb-4 800px:mb-0`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-[100%] ">
              <label className="block">Email</label>
              <input
                type="text"
                readOnly
                className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                required
                value={user?.email}
              />
            </div>
            <div className="w-[100%]">
              <label className="block">Email Responsável</label>
              <input
                type="text"
                readOnly
                className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                required
                value={user?.emailPersonCharge}
              />
            </div>
            <div className="w-[100%]">
              <label className="block ">Telefone </label>
              <input
                type="text"
                readOnly
                className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                required
                value={user?.telephone}
              />
            </div>
            <div className="w-[100%]">
              <label className="block">Telefone Responsável</label>
              <input
                type="text"
                readOnly
                className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                required
                value={user?.telephonePersonCharge}
              />
            </div>
            <div className="w-[100%]">
              <label className="block">Série que está cursando</label>
              <input
                type="text"
                readOnly
                className={`${styles.input} !w-[95%] mb-1 800px:mb-0`}
                required
                value={user?.seriesCurrentlyStudying}
              />
            </div>
            <input
              className={`w-full 800px:w-[250px] h-[40px] border-[3px] border-purple text-center dark:text-[#FFF] text-black rounded-[3px] cursor-pointer transition-all duration-400 ease-in-out hover:text-purple hover:bg-orange hover:border-orange`}
              required
              value="Update"
              type="submit"
            />
          </div>
        </form>
      </div>
    </>
  )
}

export default ProfileInfo