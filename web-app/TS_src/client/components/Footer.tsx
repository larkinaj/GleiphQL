import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import GitHubButton from 'react-github-btn'


const Footer: React.FC<{}> = () => {
  // add logic:

  return (
    <footer className='flex flex-col items-center'>
      {/* This underling style is not showing up. Need to defined a custom class and apply the styling in the css file or inline style: text-decoration: underline;
      text-decoration-offset: 0.8em; */}
      <h2 className='underline-offset-8'>Want to Contribute? </h2>

      <p className='text-xl'>Join us and help developers secure and monitor their GraphQL endpoints.</p>


      <p className='flex flex-row justify-center desktop:p-10 desktop:m-10  my-5'>
        <a href='https://github.com/oslabs-beta/graphql-rate-limiter' target='_blank' rel='noopener noreferrer' className='mr-4'>
          <FaGithub size={64} />
        </a>
        <a href='https://www.youtube.com/watch?v=dQw4w9WgXcQ' target='_blank' rel='noopener referrer' className='ml-4'>
          <FaLinkedin size={64} />
        </a>
      </p>

      <p>Star us on Github!</p>
      <GitHubButton href="https://github.com/oslabs-beta/GleiphQL" data-size="large" data-show-count="true" aria-label="Star oslabs-beta/GleiphQL on GitHub">Star</GitHubButton>


      <p className='flex justify-center items-center text-lg align-baseline mt-20 py-2 px-5 border-t-2 border-slate-300 w-full'>
        <small>Copyright © 2023 GleiphQL + OSLabs. Distributed under the MIT License - All right reserved</small>
      </p>
    </footer>
  );
};

export default Footer;