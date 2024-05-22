

const service = () =>{

    const handlePost= async (formData) => {
   
        try {
          const response = await fetch('https://664c02b535bbda10987eac04.mockapi.io/api/finances/valores', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });
    
          if (!response.ok) {
            throw new Error('Erro ao enviar os dados');
          }
    
          const result = await response.json();
          console.log('Dados enviados com sucesso:', result);
       
        } catch (error) {
          console.error('Erro:', error);
        }
      };
      const handleGet = async () => {

        try {
          const response = await fetch('https://664c02b535bbda10987eac04.mockapi.io/api/finances/valores', {
            method: 'GET',
            headers: {'content-type':'application/json'},
      
          });
      
          if (!response.ok) {
            throw new Error('Erro ao enviar os dados');
          }
      
          const result = await response.json();
          console.log('Dados enviados com sucesso:', result);
           return {result}
        } catch (error) {
          console.error('Erro:', error);
        }
      
      };


      return { handlePost, handleGet };
}

export default service