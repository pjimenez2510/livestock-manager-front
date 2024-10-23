import { Navbar } from "../dashboard/navbar/navbar";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  return (
    <div>
      <Navbar title={title} />
      <div className="mx-auto max-w-[1440px] min-h-[calc(100vh_-_56px)] items-center px-4 pb-8 pt-8 sm:px-8">
        {children}
      </div>
    </div>
  );
}
