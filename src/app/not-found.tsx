import Path from './path'; 
import { redirect } from 'next/navigation';

// This is a redirect page for the 404 error
// It will redirect to the 404 page in the 2025 folder

export default function NotFoundRedirect() {
  redirect(Path["2025"].NotFound); // Instantly redirects to /404
}
