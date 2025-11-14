import Products from '@/Components/welcome/Products';
import Layout from '@/Layouts/MainLayout';

export default function Welcome({ auth }) {
    return (
        <Layout title="Carrito de Compras" auth={auth}>
            <Products />
        </Layout>
    );
}
