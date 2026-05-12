SET LINESIZE 200
SET PAGESIZE 50
SELECT u.nombre, u.email, r.nombre AS rol
FROM usuarios u JOIN roles r ON u.rol_id = r.rol_id
ORDER BY u.nombre;
EXIT;
