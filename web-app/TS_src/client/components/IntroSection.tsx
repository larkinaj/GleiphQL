import React from 'react';


const IntroSection: React.FC<{}> = () => {

 return (
  <section className='p-8 flex flex-col md:flex-row justify-around'>
    <div className='p-4 text-center md:w-1/2'>
      <h2 className='text-2xl font-extrabold p-2'>Protect and monitor your GraphQL Endpoints</h2>
      <p>
        GleiphQL is an Express middleware library which enhances performance
        and security by calculating query complexity, optimizing resource
        allocation, and preventing bottlenecks.
      </p>
    </div>
    <div className='w-full md:w-1/2'>
      <img className='object-center m-auto' src='../assets/webapp.png' alt='screenshot of dashboard' width='500px'/>
    </div>
  </section>
  );
}

export default IntroSection; 