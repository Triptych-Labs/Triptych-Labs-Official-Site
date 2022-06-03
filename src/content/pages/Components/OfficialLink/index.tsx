import React, { useEffect } from 'react';

function OfficialLink({ href }) {
  useEffect(() => {
    window.location.href = href;
  }, []);

  return <></>;
}

export default OfficialLink;
