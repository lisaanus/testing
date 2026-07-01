"use client";

import "../../styles/style.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Wrench,
  CreditCard,
  Package,
  FileText,
  TrendingUp,
  LogOut,
} from "lucide-react";

// Import komponen sidebar baru dari Shadcn UI component folder
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export default function KontraktorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");
    const userData = localStorage.getItem("user");

    if (!isLogin || !userData) {
      router.push("/auth/login");
      return;
    }

    setUser(JSON.parse(userData));
  }, []);

  const logout = () => {
    localStorage.clear();
    alert("Logout berhasil");
    router.push("/auth/login");
  };

  if (!user) return null;

  const menuItems = [
    {
      label: "Dashboard",
      href: "/kontraktor/dashboard",
      icon: LayoutDashboard,
    },
    { label: "Proyek", href: "/kontraktor/proyek", icon: Briefcase },
    { label: "Pekerjaan", href: "/kontraktor/pekerjaan", icon: Wrench },
    { label: "Pengeluaran", href: "/kontraktor/pengeluaran", icon: CreditCard },
    { label: "Material", href: "/kontraktor/material", icon: Package },
    {
      label: "Laporan Keuangan",
      href: "/kontraktor/laporan-keuangan",
      icon: FileText,
    },
    { label: "Progres", href: "/kontraktor/progres", icon: TrendingUp },
  ];

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full bg-white">
        {/* SIDEBAR COMPONENT SHADCN */}
        <Sidebar
          collapsible="icon"
          variant="sidebar"
          className="border-r-0 shadow-md"
        >
          {/* Logo & Brand Apps */}
          <div className="p-3 mx-2 h-16 flex items-center justify-start group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:p-0 gap-3 border-b border-sidebar-border bg-white shrink-0 transition-all duration-200">
            <img
              src="/images/logo.png"
              className="h-auto w-12 object-contain shrink-0 ml-1 group-data-[collapsible=icon]:ml-0 transition-all duration-200 group-data-[collapsible=icon]:h-auto group-data-[collapsible=icon]:w-12"
              alt="Logo"
            />
            <span className="font-extrabold text-2xl tracking-tight group-data-[collapsible=icon]:hidden text-sidebar-foreground truncate">
              FinProjek
            </span>
          </div>

          {/* Profile Section di dalam Sidebar */}
          <div className="p-1 mx-2 my-3 flex flex-col items-center group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:p-0 transition-all duration-200">
            <div
              // KEMBALI TETAP rounded-full AGAR HOVER MENGUTIP AVATAR
              className="p-2 w-full flex items-center gap-3 rounded-lg cursor-pointer hover:bg-sidebar-accent transition-all duration-200 group-data-[collapsible=icon]:w-12 group-data-[collapsible=icon]:h-12 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:justify-center"
              onClick={() => router.push("/kontraktor/profile")}
            >
              <img
                src="/images/default-avatar.png"
                // UKURAN TETAP h-15 w-15 & group-data-[collapsible=icon]:h-12 group-data-[collapsible=icon]:w-12 SESUAI REQUEST
                className="h-15 w-15 rounded-full border border-sidebar-border object-cover shrink-0 transition-all duration-200 group-data-[collapsible=icon]:h-12 group-data-[collapsible=icon]:w-12"
                alt="Avatar"
              />
              <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
                <strong className="text-lg font-semibold truncate text-sidebar-foreground">
                  {user.name}
                </strong>
                <span className="text-xs text-muted-foreground capitalize">
                  {user.role}
                </span>
              </div>
            </div>
          </div>

          <SidebarContent className="px-2">
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map(({ label, href, icon: Icon }) => {
                    const isActive = pathname === href;

                    return (
                      <SidebarMenuItem key={href} className="mb-2">
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          tooltip={label}
                          className="w-full transition-all duration-200 rounded-lg group-data-[collapsible=icon]:!justify-center group-data-[collapsible=icon]:p-0"
                        >
                          <Link
                            href={href}
                            className="flex items-center gap-3 w-full px-3 py-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-[collapsible=icon]:gap-0"
                          >
                            <Icon
                              className={`!h-6 !w-6 shrink-0 ${isActive ? "text-sidebar-accent-foreground" : "text-muted-foreground"}`}
                            />
                            <span className="font-medium text-sm group-data-[collapsible=icon]:hidden">
                              {label}
                            </span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>

          {/* Bagian Bawah Sidebar / Tombol Logout */}
          <div className="p-2 border-t border-sidebar-border mt-auto">
            <SidebarMenuButton
              tooltip="Logout"
              onClick={logout}
              className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive rounded-lg px-3 py-2 group-data-[collapsible=icon]:!justify-center group-data-[collapsible=icon]:p-0"
            >
              <LogOut className="!h-6 !w-6 shrink-0" />
              <span className="group-data-[collapsible=icon]:hidden text-sm font-medium">
                Logout
              </span>
            </SidebarMenuButton>
          </div>
        </Sidebar>

        {/* CONTAINER KONTEN UTAMA */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Header Atas */}
          <header className="flex h-16 shrink-0 items-center gap-4 border-b px-6 bg-white shadow-xs">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
            <div className="h-4 w-[2px] bg-border" />
            <h3 className="text-sm px-2 pt-2 font-medium text-muted-foreground capitalize">
              Panel {user.role} &raquo; {pathname.split("/").pop()}
            </h3>
          </header>

          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
