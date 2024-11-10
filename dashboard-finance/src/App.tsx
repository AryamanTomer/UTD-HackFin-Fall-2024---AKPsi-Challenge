import { Box } from "@mui/material"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom"
const queryClient = new QueryClient();
function App() {
  return (
    <div className="app">
      <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Box width="100%" height="100%" padding="1rem 2rem 4rem">
          
        </Box>
      </BrowserRouter>
      </QueryClientProvider>
    </div>
  )
}
export default App
