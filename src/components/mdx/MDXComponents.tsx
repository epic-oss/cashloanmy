import Link from "next/link";
import { ReactNode, HTMLAttributes, AnchorHTMLAttributes } from "react";
import { MDXComponents } from "mdx/types";

/**
 * DynamicYear - Renders the current year
 */
export function DynamicYear() {
  return <>{new Date().getFullYear()}</>;
}

/**
 * Callout - Info, warning, or tip boxes
 */
interface CalloutProps {
  type?: "info" | "warning" | "tip" | "danger";
  title?: string;
  children: ReactNode;
}

export function Callout({ type = "info", title, children }: CalloutProps) {
  const styles = {
    info: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      icon: "text-blue-600",
      title: "text-blue-800",
    },
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-200",
      icon: "text-yellow-600",
      title: "text-yellow-800",
    },
    tip: {
      bg: "bg-green-50",
      border: "border-green-200",
      icon: "text-green-600",
      title: "text-green-800",
    },
    danger: {
      bg: "bg-red-50",
      border: "border-red-200",
      icon: "text-red-600",
      title: "text-red-800",
    },
  };

  const icons = {
    info: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    tip: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    danger: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  };

  const style = styles[type];

  return (
    <div className={`${style.bg} ${style.border} border rounded-lg p-4 my-6`}>
      <div className="flex gap-3">
        <div className={`${style.icon} flex-shrink-0 mt-0.5`}>{icons[type]}</div>
        <div className="flex-1">
          {title && (
            <h4 className={`${style.title} font-semibold mb-1`}>{title}</h4>
          )}
          <div className="text-gray-700 text-sm [&>p]:mb-2 [&>p:last-child]:mb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * CTABox - Lead capture CTA within content
 */
interface CTABoxProps {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

export function CTABox({
  title = "Need Help Getting Approved?",
  description = "Our specialists can review your profile and guide you to the right loan.",
  buttonText = "Get Free Consultation",
  buttonLink = "/#quote-form",
}: CTABoxProps) {
  return (
    <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl p-6 my-8 text-white">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-primary-100 mb-4">{description}</p>
      <Link
        href={buttonLink}
        className="inline-block bg-white text-primary-700 font-semibold px-6 py-2 rounded-lg hover:bg-primary-50 transition-colors"
      >
        {buttonText}
      </Link>
    </div>
  );
}

/**
 * LastUpdated - Shows last updated date
 */
interface LastUpdatedProps {
  date: string;
}

export function LastUpdated({ date }: LastUpdatedProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-MY", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <p className="text-sm text-gray-500 mb-6">
      <span className="inline-flex items-center gap-1">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Last updated: {formattedDate}
      </span>
    </p>
  );
}

/**
 * ProsConsTable - For comparison content
 */
interface ProsConsTableProps {
  pros: string[];
  cons: string[];
  prosTitle?: string;
  consTitle?: string;
}

export function ProsConsTable({
  pros,
  cons,
  prosTitle = "Pros",
  consTitle = "Cons",
}: ProsConsTableProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4 my-6">
      <div className="bg-green-50 rounded-lg p-5">
        <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          {prosTitle}
        </h4>
        <ul className="space-y-2">
          {pros.map((pro, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
              <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>{pro}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="bg-red-50 rounded-lg p-5">
        <h4 className="font-semibold text-red-800 mb-3 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          {consTitle}
        </h4>
        <ul className="space-y-2">
          {cons.map((con, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
              <svg className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span>{con}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * ComparisonTable - Generic comparison table
 */
interface ComparisonTableProps {
  headers: string[];
  rows: string[][];
}

export function ComparisonTable({ headers, rows }: ComparisonTableProps) {
  return (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            {headers.map((header, index) => (
              <th
                key={index}
                className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50">
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className="border border-gray-200 px-4 py-3 text-gray-700"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Default MDX components mapping
 */
export const mdxComponents: MDXComponents = {
  // Custom components
  DynamicYear,
  Callout,
  CTABox,
  LastUpdated,
  ProsConsTable,
  ComparisonTable,

  // Override default HTML elements with styled versions
  h1: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 mt-8" {...props} />
  ),
  h2: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 mt-8" {...props} />
  ),
  h3: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-3 mt-6" {...props} />
  ),
  h4: (props: HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="text-lg font-semibold text-gray-900 mb-2 mt-4" {...props} />
  ),
  p: (props: HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-gray-700 mb-4 leading-relaxed" {...props} />
  ),
  ul: (props: HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-inside mb-4 space-y-2 text-gray-700" {...props} />
  ),
  ol: (props: HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-700" {...props} />
  ),
  li: (props: HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props} />
  ),
  a: ({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <Link
      href={href || "#"}
      className="text-primary-600 hover:text-primary-700 underline"
      {...props}
    >
      {children}
    </Link>
  ),
  blockquote: (props: HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-primary-500 pl-4 my-4 italic text-gray-600" {...props} />
  ),
  code: (props: HTMLAttributes<HTMLElement>) => (
    <code className="bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded text-sm" {...props} />
  ),
  pre: (props: HTMLAttributes<HTMLPreElement>) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto my-4" {...props} />
  ),
  hr: () => <hr className="my-8 border-gray-200" />,
  strong: (props: HTMLAttributes<HTMLElement>) => (
    <strong className="font-semibold text-gray-900" {...props} />
  ),
  table: (props: HTMLAttributes<HTMLTableElement>) => (
    <div className="overflow-x-auto my-6">
      <table className="w-full border-collapse" {...props} />
    </div>
  ),
  th: (props: HTMLAttributes<HTMLTableCellElement>) => (
    <th className="border border-gray-200 px-4 py-3 text-left font-semibold text-gray-900 bg-gray-100" {...props} />
  ),
  td: (props: HTMLAttributes<HTMLTableCellElement>) => (
    <td className="border border-gray-200 px-4 py-3 text-gray-700" {...props} />
  ),
};
