function Footer() {
    return (
      <div style={{
        backgroundColor: '#333',
        color: '#fff',
        padding: '10px',
        textAlign: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%',
      }}>
        <p>{new Date().getFullYear()} Sandeep Prasad</p>
      </div>
    );
  }
  
  export default Footer;