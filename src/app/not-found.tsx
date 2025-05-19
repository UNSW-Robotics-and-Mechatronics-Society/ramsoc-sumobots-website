import Path from './path'; 
import { redirect } from 'next/navigation';

export default function NotFoundRedirect() {
  redirect(Path["2025"].NotFound); // Instantly redirects to /404
}
