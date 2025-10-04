// this will be the 
export default function AdminDashboard() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div>
        
        {/* Need to add a carousel here for sample products */}
        {/* Links to different pages for our router */}
        Here we will show things like: 
        <ul>
          <li>
            Current vehicles out for delivery
          </li>
          <li>
            Items that might be low on inventory
          </li>
          <li>
            Total Orders till date
          </li>
          <li>
            Link to current inventory
          </li>
        </ul>
      </div>
    </div>
  );
}
