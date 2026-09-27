import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'Johan George - Developer & Problem Solver',description:'SJSU computer science student and Marine Corps technician building thoughtful software. Explore my projects, or meet me in the terminal.',icons:{icon:'/portfolio/favicon.svg'}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
