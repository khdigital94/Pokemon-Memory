export default function Card({ id, name, sprite }) {
	const formattedName = name.charAt(0).toUpperCase() + name.slice(1);
	return (
		<div key={id} className="flex flex-col justify-center items-center p-4 w-64 max-w-[50%] rounded overflow-hidden text-slate-900 hover:text-slate-100 bg-slate-100 hover:bg-slate-700 ease-in-out transition cursor-pointer">
			<img src={sprite} alt={formattedName} className="w-48" />
			<h3 className="text-xl font-bold">{formattedName}</h3>
		</div>
	);
}
