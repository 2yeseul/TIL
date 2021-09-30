# Jdbc를 통한 Bulk Insert

``` java 

@Repository
@RequiredArgsConstructor
public class someJdbcRepository {

    private final JdbcTemplate jdbcTemplate;

    public int[] bulkInsert(List<SomeEntity> someEntities) {
        return this.jdbcTemplate.batchUpdate(
            "insert into some_table (some_value) values (?)",
            new BatchPreparedStatement() {
                @Override
                public void setValues(PreparedStatement ps, int i) throws SQLException {
                    SomeEntity someEntity = someEntities.get(i);
                    ps.setLong(1, someEntity.getSomeValue(i));
                }

                @Override
                public int getBatchSize() {
                    return someEntities.size();
            });
    }
}
``` 
