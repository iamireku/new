// /src/components/profile/profile-form.tsx
// /src/components/profile/profile-form.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { AtSign } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { avatars, industries } from '@/lib/data';

const profileSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters.'),
  betweenaId: z.string().min(3, 'ID must be at least 3 characters.'),
  email: z.string().email(),
  businessName: z.string().optional(),
  businessRole: z.string().optional(),
  businessEmail: z.string().email().optional(),
  industry: z.string().optional(),
  customIndustry: z.string().optional(),
  mainProducts: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileForm() {
  const { toast } = useToast();
  const [currentAvatar, setCurrentAvatar] = useState(avatars[0]);
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar);
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);
  const [isIdCustomized, setIsIdCustomized] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      fullName: 'User',
      betweenaId: 'user',
      email: 'user@example.com',
      businessName: 'Acme Inc.',
      businessRole: 'Founder',
      businessEmail: 'contact@acme.com',
      industry: 'Technology & IT Services',
      customIndustry: '',
      mainProducts: 'Web Development, UI/UX Design, SEO Services',
    },
  });

  const selectedIndustry = form.watch('industry');

  const handleProfileSave = (data: ProfileFormData) => {
    console.log(data);
    toast({
      title: 'Profile Updated!',
      description: 'Your changes have been saved.',
    });
  };

  const handleIdCustomize = () => {
    setIsIdCustomized(true);
    toast({
      title: 'Betweena ID Updated!',
      description: 'Your new ID is now active.',
    });
  };

  const handleAvatarSave = () => {
    setCurrentAvatar(selectedAvatar);
    setIsAvatarDialogOpen(false);
    toast({
      title: 'Avatar Updated!',
      description: 'Your new profile picture has been saved.',
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleProfileSave)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={currentAvatar.src} data-ai-hint={currentAvatar.hint} />
                <AvatarFallback>{form.getValues('fullName').charAt(0).toUpperCase()}</AvatarFallback>
              </Avatar>
              <Dialog open={isAvatarDialogOpen} onOpenChange={setIsAvatarDialogOpen}>
                <DialogTrigger asChild>
                  <Button type="button" variant="outline">Change Photo</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Choose Your Avatar</DialogTitle>
                    <DialogDescription>Select a new profile picture from the options below.</DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-3 gap-4 py-4">
                    {avatars.map((avatar, index) => (
                      <button
                        key={index}
                        type="button"
                        className={cn('rounded-full ring-2 ring-transparent hover:ring-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2', selectedAvatar.src === avatar.src && 'ring-primary')}
                        onClick={() => setSelectedAvatar(avatar)}
                      >
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={avatar.src} data-ai-hint={avatar.hint} alt={avatar.alt} />
                          <AvatarFallback>{avatar.alt.charAt(avatar.alt.length - 1)}</AvatarFallback>
                        </Avatar>
                      </button>
                    ))}
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsAvatarDialogOpen(false)}>Cancel</Button>
                    <Button type="button" onClick={handleAvatarSave}>Save</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="betweenaId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Betweena ID</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input className="pl-9" readOnly={isIdCustomized} {...field} />
                    </div>
                  </FormControl>
                  {!isIdCustomized && <p className="text-xs text-muted-foreground">You can set your unique Betweena ID once.</p>}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" disabled {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit">Save Changes</Button>
            {!isIdCustomized && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button type="button" variant="outline">Set and Lock ID</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      You can only customize your Betweena ID once. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleIdCustomize}>Confirm and Set ID</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
            <CardDescription>Update your business details here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Name</FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="businessRole"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Role</FormLabel>
                  <FormControl><Input placeholder="e.g. Founder, CEO" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="businessEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Business Email</FormLabel>
                  <FormControl><Input type="email" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an industry" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {industries.map(industry => (
                        <SelectItem key={industry} value={industry}>{industry}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {selectedIndustry === 'Other' && (
              <FormField
                control={form.control}
                name="customIndustry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Industry</FormLabel>
                    <FormControl><Input placeholder="e.g., Renewable Energy" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="mainProducts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Products/Services</FormLabel>
                  <FormControl><Textarea placeholder="e.g. Web Development, UI/UX Design, SEO Services" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit">Save Business Info</Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
