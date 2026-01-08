"use client";

interface UserInfoProps {
  email: string;
}

export default function UserInfo({ email }: UserInfoProps) {
  return (
    <div className="text-center">
      <p className="text-base text-foreground">{email}</p>
    </div>
  );
}
