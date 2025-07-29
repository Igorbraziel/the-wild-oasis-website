import Link from "next/link";

function LoginMessage() {
  return (
    <div className='grid bg-primary-800 '>
      <p className='text-center sm:text-lg text-base lg:text-xl sm:py-9 py-7 lg:py-12 self-center'>
        Please{' '}
        <Link href='/login' className='underline text-accent-500'>
          login
        </Link>{' '}
        to reserve this
        <br /> cabin right now
      </p>
    </div>
  );
}

export default LoginMessage;
