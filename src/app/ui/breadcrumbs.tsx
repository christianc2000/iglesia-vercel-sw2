import { clsx } from 'clsx';
import Link from 'next/link';
// import { lusitana } from '@/app/ui/fonts';

interface Breadcrumb {
  label: string;
  href: string;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {breadcrumbs[breadcrumbs.length - 1].label}
      </h2>
      <nav>
        <ol className="flex items-center gap-2">
          {breadcrumbs.map((breadcrumb, index) => (
            <li key={breadcrumb.href}>
              {index < breadcrumbs.length - 1 ? (
                <>
                  <Link href={breadcrumb.href} className="font-medium">{breadcrumb.label}
                  </Link>
                  <span> | </span>
                </>
              ) : (
                <span className="font-medium text-primary">
                  {breadcrumb.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}
