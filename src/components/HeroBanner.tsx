export default function HeroBanner() {
  return (
    <div className="w-full h-[600px] relative">
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: 'linear-gradient(to top, #FF8A05 0%, rgba(255, 138, 5, 0) 100%)'
        }}
      />
    </div>
  );
} 