"use client"

import { UserSettings } from '@/components/settings/UserSettings'
import { useUserQuery } from '@/hooks/queries/use-auth-query';
import React from 'react'

export default function PermissionsPage() {

  const { data: currentUser } = useUserQuery();
  const isSuperAdmin = currentUser?.data?.role === "SUPER_ADMIN";

  return (
    <div>
      {isSuperAdmin && <UserSettings />}
    </div>
  )
}

