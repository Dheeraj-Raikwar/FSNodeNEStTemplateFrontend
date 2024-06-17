import { NextPage } from "next";
import Link from 'next/link';
import AUButton from "@/components/ui/AUButton";
import AUInput from "@/components/ui/AUInput";
import { useForm } from "react-hook-form";
import { resetPasswordAPI } from "@/api/ResetPassword";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Image from "next/image";

interface Props { }

interface ResetPasswordForm {
  newPassword: string
  confirmPassword: string
  token: string | string[] | undefined
}

const ResetPassword: NextPage<Props> = () => {
  const router = useRouter();
  const { token } = router.query;
  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm<ResetPasswordForm>();

  const handleResetPassword = async (data: ResetPasswordForm) => {
    try {
      if (data.newPassword === data.confirmPassword) {
        data.token = token
        const response = await resetPasswordAPI(data);
        if (response.success === true) {
          router.push('/');
          toast.success("Your password has been reset successfully");
        }
        else {
          toast.error(response.message);
        }
      }
      else {
        toast.error("Password should be same.")
      }
    }catch (error) {
      toast.error("An unexpected error occurred")
    }
  }


  return (
    <>
      <div className='w-full flex justify-center'>
        <div className='mb-3 w-full max-w-[380px]'>
        <div className='flex justify-end mb-2'>
						<Image src="./images/fox-svgrepo-com.svg" alt="Logo" className='h-14' width={100} height={100} />
					</div>
          <h1 className='text-3xl mb-5 text-app-001 font-bold'>Reset Password </h1>
          <form onSubmit={handleSubmit((e) => handleResetPassword(e))}>
            <div className='mb-5 w-full'>
              <AUInput
                // className='w-96'
                placeholder='New Password'
                iconType="LOCK"
                type='password'
                kind='secondary'
                register={register('newPassword', { 
                  required: 'Confirm Password is required', 
                  minLength: {
                    value: 8,
                    message: 'Password should be at least 8 characters long',
                  },
                  pattern: {
                    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*(){}[\]:;<>,.?/~_+-=|]).{8,}$/,
                    message: 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
                  },
                })}
              />
              {errors.newPassword && <div className="text-xs text-red-500">{errors.newPassword.message}</div>}
            </div>
            <div className='mb-5 w-full'>
              <AUInput
                // className='w-96'
                placeholder='Confirm Password'
                iconType="LOCK"
                type='password'
                kind='secondary'
                register={register('confirmPassword', { 
                  required: 'Confirm Password is required', 
                  minLength: {
                    value: 8,
                    message: 'Password should be at least 8 characters long',
                  },
                  pattern: {
                    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*(){}[\]:;<>,.?/~_+-=|]).{8,}$/,
                    message: 'Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
                  },
                })}
              />
              {errors.confirmPassword && <div className="text-xs text-red-500">{errors.confirmPassword.message}</div>}
            </div>
            <div className='flex flex-col md:flex-row mt-5'>
              <div className='mb-3 md:mb-0 md:mr-3'>
                <AUButton type='submit' buttontype='primary' afterImage='RIGHT'>SUBMIT</AUButton>
              </div>
            </div>
          </form>
        </div>

      </div>
    </>
  );
};

export default ResetPassword;