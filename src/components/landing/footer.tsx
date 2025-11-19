'use client';

import Link from 'next/link';
import { DISSolutionsLogo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Linkedin, Dribbble } from 'lucide-react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '../ui/textarea';

const BehanceIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8.56 2.75c4.75 0 8.44 3.5 8.44 7.5 0 4-3.69 7.5-8.44 7.5-4.75 0-8.44-3.5-8.44-7.5 0-4 3.69-7.5 8.44-7.5z" />
      <path d="M16.5 8.25h-4.5" />
      <path d="M16.5 12h-5.5" />
      <path d="M13.5 15.75h2.5" />
    </svg>
  );

function SocialLink({ href, icon: Icon }: { href: string; icon: React.ElementType }) {
    return (
        <Link href={href} prefetch={false} className="text-gray-400 hover:text-white transition-colors">
            <Icon className="h-6 w-6" />
        </Link>
    );
}

const formSchema = z.object({
    name: z.string().min(2, { message: "Name must be at least 2 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    message: z.string().min(10, { message: "Message must be at least 10 characters." }),
});

type FormValues = z.infer<typeof formSchema>;


export function Footer() {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: "",
        email: "",
        message: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you shortly.",
    });
    form.reset();
  };

  return (
    <footer className="w-full shrink-0 pt-20 pb-8 bg-transparent text-white">
        <div className="container px-6 lg:px-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16">
                <div className="md:col-span-2 lg:col-span-1 space-y-4">
                    <Link href="#" prefetch={false}>
                        <DISSolutionsLogo />
                    </Link>
                    <p className="text-gray-400 max-w-xs text-sm">
                        Your trusted partner for innovative IT solutions that drive digital transformation and business growth.
                    </p>
                </div>
                <div className="md:col-span-1">
                    <h4 className="font-semibold mb-4 text-white">Links</h4>
                    <nav className="flex flex-col gap-3">
                        <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm" prefetch={false}>Style Guide</Link>
                        <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm" prefetch={false}>Licenses</Link>
                        <Link href="#" className="text-gray-400 hover:text-white transition-colors text-sm" prefetch={false}>Changelogs</Link>
                    </nav>
                </div>
                <div className="md:col-span-1">
                    <h4 className="font-semibold mb-4 text-white">Contact</h4>
                    <div className="text-gray-400 space-y-3 text-sm">
                        <p>SN8 Salasar Nagar Bldg N3,Navghar Rd<br/>Nr Mahalaxmi D,Bhayander<br/>East,Thane,Thane-401105,Maharashtr</p>
                        <p>+91 6377597323</p>
                        <p>hr@dabala.in</p>
                    </div>
                </div>
                <div className="md:col-span-2 lg:col-span-2">
                    <h4 className="font-semibold mb-4 text-white">Contact Us</h4>
                    <div className="flex gap-4 mb-6">
                        <SocialLink href="#" icon={Linkedin} />
                        <SocialLink href="#" icon={Dribbble} />
                        <SocialLink href="#" icon={BehanceIcon} />
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input placeholder="Your Name" {...field} className="bg-transparent border-gray-600 rounded-lg text-white placeholder:text-gray-400" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input type="email" placeholder="Your Email" {...field} className="bg-transparent border-gray-600 rounded-lg text-white placeholder:text-gray-400" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Textarea placeholder="Your Message" {...field} className="bg-transparent border-gray-600 rounded-lg text-white placeholder:text-gray-400" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" variant="outline" className="w-full rounded-full bg-transparent border-gray-600 text-white hover:bg-white hover:text-black">
                                Send Message
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
            <div className="mt-16 pt-8 border-t border-gray-800 text-center">
                <p className="text-sm text-gray-500">
                    &copy; 2024 DIS Solutions, Inc. All rights reserved.
                </p>
            </div>
        </div>
    </footer>
  );
}
