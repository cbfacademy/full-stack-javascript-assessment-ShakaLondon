const authHeader = (contentType) => {
    const user = JSON.parse(localStorage.getItem("user"));
  
    if (user && user.accessToken) {
      return { 'Authorization': `Bearer ${user.accessToken}`,
      'Content-Type': contentType ? contentType : "application/json" };
    } else {
      return {};
    }
  }

  export default authHeader;