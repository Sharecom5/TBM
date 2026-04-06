import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Search | The Bharat Mirror',
    description: "Search for articles, trends, and news on The Bharat Mirror.",
    alternates: {
        canonical: 'https://www.thebharatmirror.com/search',
    },
};

export default function SearchLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
