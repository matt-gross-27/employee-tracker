SELECT
  A.id
 ,A.first_name
 ,A.last_name
 ,C.title
 ,D.name AS department
 ,C.salary
 ,CONCAT(B.first_name,' ',B.last_name) AS manager
FROM
  employee A
LEFT JOIN 
  employee B
ON
  A.manager_id = B.id
LEFT JOIN
  role C
ON 
  A.role_id = C.id
LEFT JOIN
  department D
ON
  C.department_id = D.id