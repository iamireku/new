
'use client';

import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LogOut, User, Settings, CreditCard, Sun, Moon, Monitor, Crown } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { Badge } from './ui/badge';
import { getCurrentUser } from '@/lib/services/user.service';
import type { CurrentUser } from '@/lib/data';
import { useAuth } from '@/contexts/auth-context';

export function UserNav() {
  const { theme, setTheme } = useTheme();
  const [currentUserData, setCurrentUserData] = useState<CurrentUser | null>(null);
  const { user, signOut } = useAuth();

  useEffect(() => {
    async function fetchData() {
      const userData = await getCurrentUser();
      setCurrentUserData(userData);
    }
    fetchData();
  }, []);


  const userName = user?.displayName || currentUserData?.name || 'User';
  const userEmail = user?.email || 'user@example.com';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://placehold.co/100x100.png" alt="@user" data-ai-hint="person portrait" />
            <AvatarFallback>{userName.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium leading-none">{userName}</p>
              {currentUserData?.plan === 'pro' && (
                <Badge variant="secondary" className="bg-yellow-200 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-200">
                  <Crown className="mr-1 h-3 w-3" />
                  PRO
                </Badge>
              )}
            </div>
            <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/profile">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/wallet">
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Wallet</span>
            </Link>
          </DropdownMenuItem>
           <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <Settings className="mr-2 h-4 w-4" />
              <span>Theme</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
                    <DropdownMenuRadioItem value="light">
                      <Sun className="mr-2 h-4 w-4" />
                      <span>Light</span>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="dark">
                      <Moon className="mr-2 h-4 w-4" />
                      <span>Dark</span>
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="system">
                      <Monitor className="mr-2 h-4 w-4" />
                      <span>System</span>
                    </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
