import mysql.connector

cnx = mysql.connector.connect(user='gaming', password='gaming', host='gaming.gaming.com', database='gaming')
cursor = cnx.cursor()

for i in range(17):
    sql = f"INSERT INTO AM_Aule (id, type) VALUES ({i}, 'Aula');"
    cursor.execute(sql)

cnx.commit()
cursor.close()
cnx.close()
